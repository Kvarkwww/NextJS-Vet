import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Preprečitev osveževanja strani
    // Preusmeritev na stran z rezultati iskanja
    router.push(`/iskanje?pojem=${searchTerm}`);
  };
  return (
    <nav className="container mt-5 fright navbar navbar-expand-lg navbar-light bg-light">
      <div className="fright container-fluid">
        <Link href="/" className="navbar-brand" >
            <Image src="/logo-vet.png" alt="Logotip" width={96} height={84} />
        </Link>
        <div className=" fright collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* Pravilna uporaba <Link> s passHref */}
              <Link href="/zivali" passHref>
                <div className="nav-link">Živali</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/lastniki" passHref>
                <div className="nav-link">Lastniki</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cepljenja" passHref>
                <div className="nav-link">Cepljenja</div>
              </Link>
            </li>
            {/* Dodate lahko še več povezav po potrebi */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar