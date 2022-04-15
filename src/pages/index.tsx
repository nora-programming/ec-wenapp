import { useState } from 'react'
import { NextPage } from 'next'
import { Box, useDisclosure } from '@chakra-ui/react'
import { ProductList } from 'src/components/organisms/productList'
import { ProductModal } from 'src/components/molecules/productModal'
import { Common } from 'src/layout/common'
import { ProductType } from 'src/type/product'

const Home: NextPage = () => {
  const products: ProductType[] = [
    {
      id: 1,
      title: 'Product',
      price: 1000,
      imgUrl: 'https://bit.ly/dan-abramov',
      description:
        'ブルーとブラックのシャンブレー生地を使った別注の半袖シャツ。ゆったりしたシルエットで、今の気分を感じられるシャンブレーシャツに仕上げました。左の胸元にはブランドのアイコニックな蝶の刺繍を配置し、',
    },
    {
      id: 2,
      title: 'Product',
      price: 1000,
      imgUrl: 'https://bit.ly/dan-abramov',
      description: 'hoge',
    },
    {
      id: 3,
      title: 'Prodct',
      price: 1000,
      imgUrl: 'https://bit.ly/dan-abramov',
      description: 'hoge',
    },
    {
      id: 4,
      title: 'ProductProductProductProductProductProductProduct',
      price: 1000,
      imgUrl: 'https://bit.ly/dan-abramov',
      description: 'hoge',
    },
    {
      id: 5,
      title: 'Product',
      price: 1000,
      imgUrl: 'https://bit.ly/dan-abramov',
      description: 'hoge',
    },
    {
      id: 6,
      title: 'Prodct',
      price: 1000,
      imgUrl: 'https://bit.ly/dan-abramov',
      description: 'hoge',
    },
    {
      id: 7,
      title: 'Product',
      price: 1000,
      imgUrl: 'https://bit.ly/dan-abramov',
      description: 'hoge',
    },
    {
      id: 8,
      title: 'Product',
      price: 1000,
      imgUrl: 'https://bit.ly/dan-abramov',
      description: 'hoge',
    },
    {
      id: 9,
      title: 'Prodct',
      price: 1000,
      imgUrl: 'https://bit.ly/dan-abramov',
      description: 'hoge',
    },
  ]

  const [focusProduct, setFocusProduct] = useState<ProductType>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClickProduct = (product: ProductType) => {
    setFocusProduct(product)
    onOpen()
  }

  return (
    <>
      <Common>
        <Box my="32px">
          <ProductModal
            isOpen={isOpen}
            onClose={onClose}
            product={focusProduct}
          />
          <ProductList products={products} onClickProduct={onClickProduct} />
        </Box>
      </Common>
    </>
  )
}

export default Home
