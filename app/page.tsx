import Image from "next/image";
import { ChakraProvider } from '@chakra-ui/react'
import Board from "./components/board";
import { Tile } from "./components/tile";

export default function Home() {
  return (
    <ChakraProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <Board>
            <Tile />
          </Board>
        </div>
      </main>
    </ChakraProvider>
  );
}
