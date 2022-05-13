import { SuspenseImg } from "./SuspenseImg"

export const Photo = ({ size, id, title }) => {
  let url = `https://picsum.photos/id/${id}/1080/768`
  url = `https://picsum.photos/1080/768?random=${id}`

  return (
    <div className={size + ' shadow-sm shadow-black'}>
        <SuspenseImg
          src={url}
          alt={title}
          title={title}
        />
      </div>
  )
}
