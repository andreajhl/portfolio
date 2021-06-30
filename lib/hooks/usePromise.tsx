import useStatus from "lib/hooks/useStatus";

function usePromise() {
  const [status, setStatus] = useStatus();

  async function handle(promise: Promise<any>): Promise<any> {
    setStatus("loading");
    try {
      const result = await promise;
      setStatus("completed");
      return result;
    } catch (error) {
      setStatus("rejected");
      throw error;
    }
  }

  return { handle, status, setStatus };
}

export default usePromise;
