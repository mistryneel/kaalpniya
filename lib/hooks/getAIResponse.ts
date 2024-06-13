// This hook is used to fetch the data from Supabase and return the response + to copy the link to the clipboard
import { useState, useEffect } from "react";

export const getResponse = (toolPath: string, params: any) => {
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState(null);
  const [input, setInput] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (params.id) {
      getData(params.id);
    }
  }, [params.id]);

  const getData = async (id: any) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/fetch?id=${id}`);
      if (!response.ok) {
        throw new Error("Network response was not OK.");
      }
      const data = await response.json();
      setOutput(data.output_data);
      setInput(data.input_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    const linkToCopy = `${window.location.origin}/${toolPath}/${params.id}`;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 3000);
      })
      .catch((err) => console.error("Could not copy text: ", err));
  };

  return { loading, output, input, linkCopied, copyLink };
};
