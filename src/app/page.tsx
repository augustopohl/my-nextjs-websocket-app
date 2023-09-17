import NumberDisplay from '@/components/NumberDisplay';
import WebSocketComponent from '@/components/WebSocketComponent';

export default function Home() {
  return (
    <div className="container mx-auto mt-8">
      <main>
        <WebSocketComponent />
        <NumberDisplay />
      </main>
    </div>
  );
}
