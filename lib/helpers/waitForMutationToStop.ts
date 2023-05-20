import { Locator } from "@playwright/test";

/**
 * Wait for `elem` to have no mutations for a period of
 * `noMutationDuration` ms. If `timeout` ms elapse without a "no mutation"
 * period of sufficient length, throw an error.
 * @param elem
 * @param noMutationDuration
 * @param mutTimeout
 * @param waitForFirstMutation If true, wait until the first mutation before
 * starting to wait for the `noMutationDuration` period.
 */
export const waitForMutationToStop = async (
  elem: Locator,
  noMutationDuration = 500,
  mutTimeout = 10 * 1000,
  waitForFirstMutation = false
): Promise<void> => {
  return elem.evaluate(
    async (
      elem,
      { noMutationDuration, timeout, waitForFirstMutation }
    ): Promise<void> => {
      let timeoutId: NodeJS.Timeout | undefined,
        noMutationTimeoutId: NodeJS.Timeout | null | undefined;

      const elemId = elem.id;
      console.log(
        `---\nStarting to wait for mutations to stop on ${elemId} | Time: ${Date.now()}\n---\n`
      );

      return (
        Promise.race([getTimeoutPromise(), getWaitConditionPassedPromise()])
          .then(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_value) => {
              console.log(
                `${noMutationDuration} ms have elapsed since this function was called or the last mutation was detected. Fulfilling.`
              );
            },
            (reason) => {
              console.log(
                `${timeout} ms have elapsed without a ${noMutationDuration} ms period devoid of mutation on elem ${elemId}. Rejecting.`
              );
              throw new Error(reason);
            }
          )
          //Clear timeouts - if we don't, Node will refuse to exit until active timeouts expire
          .finally(() => {
            if (timeoutId) clearTimeout(timeoutId);
            if (noMutationTimeoutId) clearTimeout(noMutationTimeoutId);
            noMutationTimeoutId = null;
          })
      );

      function getTimeoutPromise() {
        return new Promise(
          (resolve, reject) =>
            (timeoutId = setTimeout(
              reject,
              timeout,
              `Reached timeout of ${timeout} ms while waiting for mutation to stop on element ${elemId}.`
            ))
        );
      }

      function getWaitConditionPassedPromise() {
        // eslint-disable-next-line no-async-promise-executor,@typescript-eslint/no-unused-vars
        return new Promise(async (resolve, _reject) => {
          if (waitForFirstMutation) {
            console.log("Waiting for first mutation.");
            await waitForMutation(elem);
          }
          // eslint-disable-next-line no-constant-condition
          while (true) {
            noMutationTimeoutId = setTimeout(resolve, noMutationDuration); //We reset this timer every time a mutation occurs. So, when it finally "executes", we know that
            // `noMutationDuration` has passed since the last mutation.
            console.log(`Waiting ${noMutationDuration} ms for mutation.`);
            await waitForMutation(elem);
            if (!noMutationTimeoutId) {
              break;
            }
            clearTimeout(noMutationTimeoutId);
          }
        });
      }

      //Resolve when a mutation occurs on elem.
      async function waitForMutation(elem: SVGElement | HTMLElement) {
        const elemSnapshot = elem.innerHTML;
        return new Promise<void>((resolve) => {
          const target = document.documentElement;
          const options = {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true,
          };
          const mutationObserver = new MutationObserver(
            (
              mutationRecords: MutationRecord[],
              observer: { disconnect: () => void }
            ) => {
              mutationRecords.forEach(() => {
                if (elem.innerHTML !== elemSnapshot) {
                  console.log("Mutation detected.");
                  resolve();
                  observer.disconnect();
                }
              });
            }
          );
          mutationObserver.observe(target, options);
        });
      }
    },
    { noMutationDuration, timeout: mutTimeout, waitForFirstMutation }
  );
};
