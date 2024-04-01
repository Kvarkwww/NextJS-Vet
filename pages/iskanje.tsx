// pages/iskanje.js
import { useRouter } from 'next/router';

export default function Iskanje() {
  const router = useRouter();
  const { pojem } = router.query; // Dobi iskalni niz iz URL

  // Tukaj implementirajte logiko za pridobivanje in filtriranje podatkov na podlagi iskalnega niza 'pojem'
  // Za ta primer predpostavimo, da imate funkcijo fetchData, ki vrne filtrirane podatke

  return (
    <div>
      <h1>Rezultati iskanja za: {pojem}</h1>
      {/* Prikaz rezultatov iskanja */}
    </div>
  );
}