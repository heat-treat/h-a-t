// import { useEffect, useState } from 'react'
// import './List.css'
// import axios from "axios"
// import {toast} from "react-toastify"

// const List = ({url}) => {

//   // const url = "http://localhost:4000"
//   const [list,setList] = useState([]);

//   const fetchList = async () => {
//   const response = await axios.get(`${url}/api/food/list`);
//   // console.log(response.data);
  
//       if (response.data.success) {
//         setList(response.data.data);
//       }
//        else 
//       {
//          toast.error("Error")

//       }
//   }


//   const removeFood = async(foodId) => {
//       // console.log(foodId);
//       const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
//       await fetchList();
//       if (response.data.success) {
//         toast.success(response.data.message)
//       } 
//       else {
//         toast.error("Error")
//       }
      
//   }

//   useEffect(()=>{
//     fetchList();
//   },[])
//   return (
//     <div className='list add flex-col'>
//       <p>All Foods List</p>
//         <div className="list-table">
//           <div className="list-table-format title">
//             <b>Image</b>
//             <b>Name</b>
//             <b>Category</b>
//             <b>Price</b>
//             <b>Action</b>
//           </div>
//           {list.map((item,index)=>{
//             return (
//               <div key={index} className='list-table-format'>
//                   <img src={`${url}/images/`+item.image} alt="" />
//                   <p>{item.name}</p>
//                   <p>{item.category}</p>
//                   <p>{item.price} TK</p>
//                   <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
                  
//               </div>
//             )
//           })}
//         </div>
//     </div>
//   )
// }

// export default List

























//Gpie//

// import { useEffect, useState } from 'react';
// import './List.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const List = ({ url = 'http://localhost:4000' }) => {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchList = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${url}/api/food/list`);
//       if (response.data && response.data.success) {
//         setList(response.data.data || []);
//       } else {
//         toast.error(response.data?.message || 'Failed to load list');
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || 'Network error while fetching list');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeFood = async (foodId) => {
//     try {
//       const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
//       if (response.data && response.data.success) {
//         toast.success(response.data.message || 'Item removed');
//         await fetchList();
//       } else {
//         toast.error(response.data?.message || 'Error removing item');
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || 'Network error while removing item');
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="list add flex-col">
//       <p className='Para'>All Foods List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>

//         {loading && <div className="list-loading">Loading...</div>}
//         {!loading && list.length === 0 && <div className="list-empty">No items found</div>}

//         {!loading &&
//           list.map((item) => (
//             <div key={item._id} className="list-table-format">
//               <img src={`${url}/images/${item.image}`} alt={`${item.name} image`} />
//               <p className="cell-name">{item.name}</p>
//               <p className="cell-category">{item.category}</p>
//               <p className="cell-price">{item.price} TK</p>
//               <button
//                 type="button"
//                 onClick={() => removeFood(item._id)}
//                 className="cell-action cursor"
//                 aria-label={`Remove ${item.name}`}
//                 title={`Remove ${item.name}`}
//               >
//                 X
//               </button>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default List;






















import { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url = 'https://h-a-t-backend.onrender.com' }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data && response.data.success) {
        setList(response.data.data || []);
      } else {
        toast.error(response.data?.message || 'Failed to load list');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Network error while fetching list');
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data && response.data.success) {
        toast.success(response.data.message || 'Item removed');
        await fetchList();
      } else {
        toast.error(response.data?.message || 'Error removing item');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Network error while removing item');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <div className="list-table">
        <p className='Para'>All Foods List</p>
        {/* Table Header */}
        <div className="list-table-format title">
          <b>#</b>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Loading & Empty States */}
        {loading && <div className="list-loading">Loading...</div>}
        {!loading && list.length === 0 && <div className="list-empty">No items found</div>}

        {/* List Items with Index */}
        {!loading &&
          list.map((item, index) => (
            <div key={item._id} className="list-table-format">
              <p className="cell-index">{index + 1}</p>
              
              {/* FIXED IMAGE LOGIC BELOW */}
              <img 
                src={item.image.startsWith("http") ? item.image : `${url}/images/${item.image}`} 
                alt={`${item.name} image`} 
              />
              
              <p className="cell-name">{item.name}</p>
              <p className="cell-category">{item.category}</p>
              <p className="cell-price">{item.price} TK</p>
              <button
                type="button"
                onClick={() => removeFood(item._id)}
                className="cell-action cursor"
                aria-label={`Remove ${item.name}`}
                title={`Remove ${item.name}`}
              >
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;
