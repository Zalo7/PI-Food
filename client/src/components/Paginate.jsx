import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";
import '../styles/Paginate.css';


export default function Paginate() {
  const recipes = useSelector((state) => state.filtrados);
  const [ currentPage, setCurrentPage ] = useState(0);
  let numero = 1;

  const nextPage = () => {
    numero = numero + 1;
    if(recipes.length <= currentPage + 9) {
        setCurrentPage(currentPage);
    } else setCurrentPage(currentPage + 9);
};

const prevPage = () => {
  numero = numero - 1 ;
    if(currentPage < 10){
        setCurrentPage(0);
    } else {
        setCurrentPage(currentPage - 9);
    }
}

const FirstPage = () => {
  numero = 1;
  setCurrentPage(0);
};

const lastPage = () => {
  numero = 11;
  setCurrentPage(recipes.length - 9);
}


useEffect(() => {
  FirstPage();
}, [recipes]);

const list = recipes.slice(currentPage, currentPage + 9);

console.log(currentPage, 'currentPage')

return (
  <div className="container-page">
      <div className="page-container">
      {numero} 
         <BsChevronDoubleLeft className="start" onClick={FirstPage} />
         &nbsp;
         <BsChevronLeft size={25} className="back" onClick={prevPage} />
         &nbsp;
         <BsChevronRight size={25} className="back" onClick={nextPage} />
         &nbsp;
         <BsChevronDoubleRight className="end" onClick={lastPage} />
      </div>
      <div>
            {
             list.map((el) => (
          <Link key={el.id} to={`/recipes/${el.id}`} style={{ textDecoration: 'none' }}>
 <Card className="card-pagination" 
            image={el.image} 
            name={el.name}
            diets={el.diets? el.diets : el.dietTypes.map(e => e.name)}
             /> 
          </Link>
        ))}  
            </div>
        </div>
    )
}

// import React from "react";

// export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
//   let pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
//     pageNumbers.push(i);
//   }
// if(allRecipes < 12) {
//   pageNumbers = false;
// }


//   return (
//     <div>
//     <nav>
//       <ul>
//         {pageNumbers &&
//           pageNumbers.map((number, i) => (
//             <li key={i} >
//               <button onClick={() => paginado(number)}>{number} </button>
//             </li>
//           ))}
//       </ul>
//     </nav>
//     </div>
//   );
// }