import Image from "next/image";
import { ChakraProvider } from '@chakra-ui/react'
import Board from "./components/board";

export default function Home() {
  return (
    <ChakraProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Huedoku</h1>
        <div>
          <Board />
        </div>
      </main>
    </ChakraProvider>
  );
}
