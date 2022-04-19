import { useState, useEffect } from 'react'
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
import { SalesType } from 'src/type/sale'
import { useRequireSignin } from 'src/hooks/useRequireSignin'
import axios from 'axios'

const Sales: NextPage = () => {
  useRequireSignin()

  const [sales, setSales] = useState<SalesType[]>([])

  useEffect(() => {
    const f = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/sales`, {
          withCredentials: true,
        })

        setSales(res.data)
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
          売上
        </Text>
        <>
          {sales && sales.length > 0 ? (
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontSize="16px">商品名</Th>
                    <Th fontSize="16px">購入者</Th>
                    <Th fontSize="16px" isNumeric>
                      売上
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <>
                    {sales.map((s) => {
                      return (
                        <Tr key={s.id}>
                          <Td>{s.title}</Td>
                          <Td>{s.buyer_name}</Td>
                          <Td isNumeric>{s.price}円</Td>
                        </Tr>
                      )
                    })}
                  </>
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Text>まだ購入された商品はありません</Text>
          )}
        </>
      </Box>
    </Common>
  )
}

export default Sales
