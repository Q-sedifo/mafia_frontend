import { Lobby } from "./(lobby)"

interface IProps {
  params: Promise<{ id: string }>
}

export default async function Room({ params }: IProps) {
  const { id } = await params

  return (
    <Lobby roomId={id}/>
  )
}