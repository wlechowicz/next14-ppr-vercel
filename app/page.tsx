import { Suspense } from "react";
import NormalComponent from "./NormalComponent";
import SuspendedComponent from "./SuspendedComponent";

const Loader = () => {
  return <div>Loading...</div>;
};

/** Add your relevant code here for the issue to reproduce */
export default function Home() {
  return (
    <div>
      <p>Normal component rendered statically:</p>
      <NormalComponent />
      <p>
        Suspended component with <i>cookies</i>:
      </p>
      <Suspense fallback={<Loader />}>
        <SuspendedComponent />
      </Suspense>
      <p>Normal component rendered statically:</p>
      <NormalComponent />
    </div>
  );
}
