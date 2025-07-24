import React, { useEffect, useState } from "react";

export default function CardsSection() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const response = await fetch("/api/articles");
    const data = await response.json();
    console.log(data);
  };

  return <div>CardsSection</div>;
}
