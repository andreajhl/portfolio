import useStatus from "lib/hooks/useStatus";

function usePromise() {
  const [status, setStatus] = useStatus();

  async function handle(promise: Promise<any>): Promise<any> {
    setStatus("loading");
    try {
      await promise;
      setStatus("completed");
    } catch (error) {
      setStatus("rejected");
      throw error;
    }
  }

  return { handle, status, setStatus };
}

export default usePromise;
