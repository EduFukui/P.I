export default function generateId() {
    return (
      Date.now().toString() +
      Math.random()
        .toString(36)
        .substring(2, 8)
    );
  }