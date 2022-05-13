import { SuspenseImg } from "./SuspenseImg"

export const Photo = ({ size, url, title }) => {
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
