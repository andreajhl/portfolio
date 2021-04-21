import Head from "next/head";

type MicroDataTagsProps = {
  priceAmount?: string;
  priceCurrency?: string;
  productBrand?: string;
  productAvailability?:
    | "in stock"
    | "out of stock"
    | "available for order"
    | "discontinued";
  productCondition?: "new" | "refurbished" | "used";
  productCategory: string;
  productId: string;
};

function MicroDataTags({
  priceAmount = "0.00",
  priceCurrency = "USD",
  productBrand = "Famosos Inc.",
  productAvailability = "in stock",
  productCondition = "new",
  productCategory,
  productId
}: MicroDataTagsProps) {
  return (
    <Head>
      <meta name="og:price:amount" content={priceAmount} />
      <meta name="og:price:currency" content={priceCurrency} />
      <meta property="product:brand" content={productBrand} />
      <meta property="product:category" content={productCategory} />
      <meta property="product:availability" content={productAvailability} />
      <meta property="product:condition" content={productCondition} />
      <meta property="product:price:amount" content={priceAmount} />
      <meta property="product:price:currency" content={priceCurrency} />
      <meta property="product:retailer_item_id" content={productId} />
    </Head>
  );
}

export default MicroDataTags;
