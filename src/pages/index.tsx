import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { Box, useDisclosure, Text } from '@chakra-ui/react'
import { ProductList } from 'src/components/organisms/productList'
import { ProductModal } from 'src/components/molecules/productModal'
import { Common } from 'src/layout/common'
import { ProductType } from 'src/type/product'
import axios from 'axios'

const Home: NextPage = () => {
  const [focusProduct, setFocusProduct] = useState<ProductType>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [products, setProducts] = useState([])

  const loadProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/products`, {
        withCredentials: true,
      })

      setProducts(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const onClickProduct = (product: ProductType) => {
    setFocusProduct(product)
    onOpen()
  }

  return (
    <>
      <Common>
        <Box my="48px">
          <Text fontSize="22px" fontWeight="bold" textAlign="center" mb="24px">
            商品一覧
          </Text>
          <ProductModal
            isOpen={isOpen}
            onClose={onClose}
            product={focusProduct}
            loadProducts={loadProducts}
          />
          {products && products.length > 0 ? (
            <ProductList products={products} onClickProduct={onClickProduct} />
          ) : (
            <Box mt="32px">
              <Text textAlign="center">まだ出品されている商品はありません</Text>
            </Box>
          )}
        </Box>
      </Common>
    </>
  )
}

export default Home
