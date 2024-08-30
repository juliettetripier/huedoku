import Image from "next/image";
import { ChakraProvider } from '@chakra-ui/react'
import Board from "./components/board";
import "./globals.css";

export default function Home() {
  return (
    <ChakraProvider>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="header">
          <h1>Huedoku</h1>
          <button className="submit-button disabled">Submit</button>
        </div>
        <div>
          <Board />
        </div>
      </main>
    </ChakraProvider>
  );
}
