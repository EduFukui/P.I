// import { useState } from "react";

// function CreateGuest() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//   });

//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     await fetch(
//       "http://localhost:3000/convidados/create",
//       {
//         method: "POST",
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
//         placeholder="Nome"
//         onChange={handleChange}
//       />

//       <input
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//       />

//       <button>Salvar</button>
//     </form>
//   );
// }

// export default CreateGuest;