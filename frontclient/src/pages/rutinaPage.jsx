import { useAuth } from "../context/authcontext"

function RutinaPage() {

  const { user } = useAuth()
  //console.log(user)

  return (
    <div>rutinaPage</div>
  )
}

export default RutinaPage