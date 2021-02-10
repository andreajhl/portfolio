class CancellablePromise extends Promise {
  constructor(executor) {
    let cancel;
    const cancellableExecutor = (resolve, reject) => {
      cancel = () => reject("Promise cancelled");
      executor(resolve, reject);
    };
    super(cancellableExecutor);
    this.cancel = cancel;
  }
}

export default CancellablePromise;
