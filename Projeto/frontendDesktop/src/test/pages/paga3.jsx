// import { useEffect, useState } from "react";

// function Guests() {
//   const [guests, setGuests] = useState([]);
//   const [search, setSearch] = useState("");

//   // LISTAR
//   async function fetchGuests() {
//     const response = await fetch(
//       "http://localhost:3000/convidados/list"
//     );

//     const data = await response.json();

//     setGuests(data);
//   }

//   useEffect(() => {
//     fetchGuests();
//   }, []);

//   // EXCLUIR
//   async function deleteGuest(id) {
//     await fetch(
//       `http://localhost:3000/convidados/delete/${id}`,
//       {
//         method: "DELETE",
//       }
//     );

//     setGuests((prev) =>
//       prev.filter((guest) => guest.id !== id)
//     );
//   }

//   const filteredGuests = guests.filter((guest) =>
//     guest.name
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Pesquisar"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {filteredGuests.map((guest) => (
//         <div key={guest.id}>
//           <h2>{guest.name}</h2>
//           <p>{guest.email}</p>

//           <button onClick={() => deleteGuest(guest.id)}>
//             Excluir
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Guests;