import Products from "@/components/product/Products";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Products />
      <Button className="m-4">Test</Button>
    </div>
  );
}
