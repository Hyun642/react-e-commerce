import { useNavigate } from "react-router-dom";

export default function Main() {
     const navigate = useNavigate();
     return (
          <div
               style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "lightGray",
                    height: "500px",
                    gap: "10px",
               }}
          >
               <div
                    style={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                         backgroundColor: "lightGray",
                    }}
               >
                    Main
               </div>
               <button
                    onClick={() => {
                         navigate("/");
                    }}
               >
                    로그인으로 이동
               </button>
          </div>
     );
}
