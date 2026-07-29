// import { useEffect, useState } from "react";

// export default function Home() {
//   const [name, setName] = useState("");
//   const [guests, setGuests] = useState([]);
//   const [loading, setLoading] = useState(false);

//   async function fetchGuests(searchName = "") {
//     try {
//       setLoading(true);

//       const query = searchName ? `?name=${encodeURIComponent(searchName)}` : "";
//       const response = await fetch(`http://localhost:3000/guest/get${query}`);

//       const data = await response.json();
//       setGuests(data.data);
//     } catch (error) {
//       console.error("Erro ao buscar convidados:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // carrega sem filtro ao abrir
//   useEffect(() => {
//     fetchGuests();
//   }, []);

//   function handleSearch(e) {
//     e.preventDefault();
//     fetchGuests(name);
//   }

//   return (
//     <div>
//       <h2>Lista de Convidados</h2>

//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Buscar por nome..."
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <button type="submit">Buscar</button>
//       </form>

//       {loading && <p>Carregando...</p>}

//       <ul>
//         {guests.map((guest) => (
//           <li key={guest.id}>
//             {guest.name} - {guest.checked_in ? "✅ Presente" : "❌ Ausente"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }