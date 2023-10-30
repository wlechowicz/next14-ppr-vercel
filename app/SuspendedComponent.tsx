import { cookies } from "next/headers";

type Product = {
  id: string;
  title: string;
};

export default async function Suspended() {
  async function fetchStuff() {
    "use server";
    // using cookies to force PPR
    const hasCookie = cookies().has("foo-bar");
    const randomSkip = Math.floor(Math.random() * 90);

    // adding 3s delay to show suspense fallback
    const dataPromise = new Promise<Product[]>((resolve) => {
      setTimeout(
        () =>
          fetch(
            `https://dummyjson.com/products?limit=10&skip=${randomSkip}&select=title,id`
          ).then((res) => res.json().then((data) => resolve(data.products))),
        3000
      );
    });
    return Promise.all([dataPromise, hasCookie]);
  }

  const [data, hasCookie] = await fetchStuff();

  return (
    <div>
      <p>hasCookie? {hasCookie.toString()}</p>
      <ul>
        {data.map((product) => {
          return <li key={`product-${product.id}`}>{product.title}</li>;
        })}
      </ul>
    </div>
  );
}
