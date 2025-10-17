import { useState, useEffect } from "react";

function Personajes() {
  const [characters, setCharacters] = useState([]); // personajes cargados
  const [page, setPage] = useState(1); // página actual
  const [search, setSearch] = useState(""); // texto de búsqueda
  const [totalPages, setTotalPages] = useState(1); // número total de páginas

  const fetchCharacters = async (pageNumber = 1, name = "") => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}&name=${name}`
      );
      if (!response.ok) throw new Error("No se encontraron personajes.");
      const data = await response.json();

      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      setCharacters([]);
      console.error("Error al obtener personajes:", error);
    }
  };

  useEffect(() => {
    fetchCharacters(page, search);
  }, [page, search]);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCharacters(1, search);
  };

  return (
    <>
      <header className="app-header">
        <h1>Rick y Morty</h1>
      </header>

      <section className="controls">
        <h2>Personajes</h2>

        <div className="pagination">
          <button className="btn" onClick={prevPage}>Anterior</button>
          <span>Página {page} de {totalPages}</span>
          <button className="btn" onClick={nextPage}>Siguiente</button>
        </div>   

        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn search-btn" type="submit">Buscar</button>
        </form>
      </section>

      <section className="characters">
        <h2>Resultados</h2>
        <div className="cards-container">
          {characters.length > 0 ? (
            characters.map((char) => (
              <div key={char.id} className="card">
                <img src={char.image} alt={char.name} />
                <h3>{char.name}</h3>
                <p><strong>Especie:</strong> {char.species}</p>
                <p><strong>Estado:</strong> {char.status}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron personajes.</p>
          )}
        </div>
      </section>

      <section className="page-numbers">
        {}
        {[...Array(Math.min(totalPages, 10))].map((_, i) => (
          <button
            key={i}
            className={`page-btn ${page === i + 1 ? "active" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </section>
    </>
  );
}

export default Personajes;
 