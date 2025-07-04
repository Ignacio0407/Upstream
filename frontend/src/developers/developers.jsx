import { Table } from "reactstrap";
import useFetchState from "../util/useFetchState";   
   
export default function DeveloperList() { 
    const [developers, setDevelopers] = useFetchState( [], `/api/v1/developers` ); 

    const imgnotfound = "https://cdn-icons-png.flaticon.com/512/48/48639.png";  
    
    const developerList = 
    developers.map((d) => { 
        return ( 
            <tr key={d.id}> 
                <td className="text-center">{d.name}</td> 
                <td className="text-center"> {d.email} </td> 
                <td className="text-center"> <a href={d.url}>{d.url}</a> </td> 
                <td className="text-center"> <img src={d.properties.picUrl ? d.properties.picUrl : imgnotfound } 
                                                alt={d.name} width="50px"/>   
                </td> 
            </tr> 
        ); 
    });

    return ( 
        <> 
         <div className="admin-page-container"> 
            <h1></h1>
           <h1 className="text-center">Developers</h1>
           <div> 
                <Table aria-label="developers" className="mt-4"> 
                    <thead> 
                        <tr> 
                            <th className="text-center">Name</th> 
                            <th className="text-center">e-mail</th> 
                            <th className="text-center">URL</th> 
                            <th className="text-center">Picture</th> 
                        </tr> 
                    </thead> 
                    <tbody>{developerList}</tbody> 
                </Table> 
            </div> 
            </div> 
        </> 
); 
} 