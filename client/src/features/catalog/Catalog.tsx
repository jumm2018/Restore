import { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";


const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,setLoading]= useState(true)
  useEffect(() => {
   agent.Catalog.list().then(products=>setProducts(products)).catch((error)=>console.log(error)).finally(()=>setLoading(false))
  }, []);

  if(loading) return <LoadingComponent message="loading products..."/>
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
