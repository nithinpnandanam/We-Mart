import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { FC } from "react";

import "./EachProduct.css";

import { EachProductProps } from "./EachProduct.types";

const EachProduct: FC<EachProductProps> = ({
  product: { title, description, thumbnail },
}) => {
  // const {product} = props
  // const {title} = prp1
  //   console.log(thumbnail)
  return (
    <div>
      <Card className="product-card">
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
