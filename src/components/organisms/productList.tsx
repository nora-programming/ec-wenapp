import { Box, Grid } from '@chakra-ui/react'
import { ProductType } from 'src/type/product'
import { ProductCard } from 'src/components/atoms/productCard'

type PropType = {
  products: ProductType[]
  onClickProduct: (product: ProductType) => void
}

export const ProductList = ({ products, onClickProduct }: PropType) => {
  return (
    <>
      <Box w="800px" mx="auto">
        <Grid templateColumns="repeat(3, 1fr)" gap="60px">
          {products.map((p) => {
            return (
              <Box key={p.id} mx="auto" onClick={() => onClickProduct(p)}>
                <ProductCard
                  imgUrl={p.imgUrl || 'https://bit.ly/dan-abramov'}
                  price={p.price}
                >
                  {p.title}
                </ProductCard>
              </Box>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}
