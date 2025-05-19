
import  axios from 'axios'
import { useEffect, useState } from 'react'

function Students(){
    const [users,setUsers]=useState([])
    const [form,setForm]=useState({name:'',email:''})

    const fetchUsers=async ()=>{
        
        try {
            const response=await axios.get('http://localhost:1010')
            setUsers(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        fetchUsers()
    }, [])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            await axios.post('http://localhost:1010/create',form)
            fetchUsers()
            setForm({ name: '', email: '' })

        } catch (error) {
            console.error(error)
        }

    }

    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                 placeholder="name" 
                 name='name'
                 value={form.name} 
                 onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})}
                 required/><br />
                <input type="text"
                 placeholder="email"
                 name='email'
                 value={form.email} 
                 onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})}
                 required /><br />
                <button type="submit">Submit</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>    
                    <tbody>
                        {
                            users.map((user,id)=>{
                                return(
                                    <tr key={id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                
            </table>
        </div>
    )
}
export default Students