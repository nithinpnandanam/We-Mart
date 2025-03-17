import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC } from "react";
import './EachProduct.css'
type Product = {
    thumbnail: string;
  title: string;
  description: string;
};
type EachProductProps = {
  prp1: Product;
};
const EachProduct: FC<EachProductProps> = ({
  prp1: { title, description,thumbnail },
}) => {
  // const {prp1} = props
  // const {title} = prp1
//   console.log(thumbnail)
  return (
    <div>
      <Card  className="product-card">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={thumbnail}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default EachProduct;
