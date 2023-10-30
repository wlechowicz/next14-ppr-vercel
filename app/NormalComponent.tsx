export default async function Normal() {
  async function fetchStuff() {
    "use server";
    const randomSkip = Math.floor(Math.random() * 90);
    return fetch(
      `https://dummyjson.com/products?limit=10&skip=${randomSkip}&select=title,id`
    )
      .then((res) => res.json())
      .then((data) => data.products);
  }

  const data = await fetchStuff();

  return (
    <ul>
      {data.map((product) => {
        return <li key={`product-${product.id}`}>{product.title}</li>;
      })}
    </ul>
  );
}
