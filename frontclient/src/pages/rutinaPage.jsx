import { useAuth } from "../context/authcontext"

function rutinaPage() {

  const { user } = useAuth()
  console.log(user)

  return (
    <div>rutinaPage</div>
  )
}

export default rutinaPage