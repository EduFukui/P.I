// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function EditGuest() {
//   const { id } = useParams();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//   });

//   // BUSCAR CONVIDADO
//   async function fetchGuest() {
//     const response = await fetch(
//       `http://localhost:3000/convidados/${id}`
//     );

//     const data = await response.json();

//     setFormData(data);
//   }

//   useEffect(() => {
//     fetchGuest();
//   }, []);

//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   }

//   // ATUALIZAR
//   async function handleSubmit(e) {
//     e.preventDefault();

//     await fetch(
//       `http://localhost:3000/convidados/update/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       }
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//       />

//       <input
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//       />

//       <button>Atualizar</button>
//     </form>
//   );
// }

// export default EditGuest;
