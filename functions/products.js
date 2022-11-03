import dotenv from "dotenv";
const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.VITE_AIRTABLE_API_KEY })
  .base(process.env.VITE_BASE_ID)
  .table("products");

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  if (id) {
    try {
      const product = await airtable.retrieve(id);
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server Error`,
      };
    }
  }

  try {
    const { records } = await airtable.list();
    const products = records.map((product) => {
      const { id } = product;
      const { name, image, price, desc } = product.fields;
      const url = image[0].url;
      return { id, name, url, price, desc };
    });
    return {
      headers: { "Access-Control-Allow-Origin": "*" },
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};
