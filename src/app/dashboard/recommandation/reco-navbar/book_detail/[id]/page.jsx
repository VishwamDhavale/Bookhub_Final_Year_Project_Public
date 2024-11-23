"use client";
import { React, useState, useEffect } from "react";
import axios from "axios";
import BookDetails from "@/components/recommandation/BookDetails";

export default function Page({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = params;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      // console.log("Book ID at client:", id);
      const response = await axios.post("/api/books/getBookDetails", id);
      // console.log("response.data", response.data);
      setProduct(response.data); // Assuming the book data is in response.data.data
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No book details found</div>;
  }

  return (
    <div>
      <BookDetails book={product.data} />
    </div>
  );
}
