import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { Common } from 'src/layout/common'
import { useRequireSignin } from 'src/hooks/useRequireSignin'
import { PurchasedProductType } from 'src/type/purchasedProduct'
import axios from 'axios'

const ProductPurchased: NextPage = () => {
  useRequireSignin()
  const [purchasedProducts, setPurchasedProducts] =
    useState<PurchasedProductType[]>()
  useEffect(() => {
    const f = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/purchased_products`,
          {
            withCredentials: true,
          },
        )

        setPurchasedProducts(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    f()
  }, [])
  return (
    <Common>
      <Box mt="48px">
        <Text fontSize="22px" fontWeight="bold" textAlign="center" mb="24px">
          購入した商品
        </Text>
        <>
          {purchasedProducts && purchasedProducts.length > 0 ? (
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontSize="16px">商品名</Th>
                    <Th fontSize="16px">販売者</Th>
                    <Th fontSize="16px" isNumeric>
                      金額
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <>
                    {purchasedProducts.map((p) => {
                      return (
                        <Tr key={p.id}>
                          <Td>{p.title}</Td>
                          <Td>{p.creater_name}</Td>
                          <Td isNumeric>{p.price}円</Td>
                        </Tr>
                      )
                    })}
                  </>
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Text>まだ購入した商品はありません</Text>
          )}
        </>
      </Box>
    </Common>
  )
}

export default ProductPurchased
