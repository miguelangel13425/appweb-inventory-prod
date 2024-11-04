import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchWarehouses } from '@/redux/actions/inventory/warehouseActions'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Spinner, Card, Input } from '@/components/index'
import {
  NotFound,
  Unauthorized,
  Forbidden,
  ServerError,
} from '@/modules/base/index'
import { Edit } from '@geist-ui/icons'
import CreateWarehouseModal from '../components/CreateWarehouseModal'
import { Warehouse } from '@/redux/models/inventory'
import { hasPermission } from '@/utils/permissions'

const WarehouseList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { warehouses, loading, status, error, pagination } = useSelector(
    (state: RootState) => state.warehouse,
  )
  const { user } = useSelector((state: RootState) => state.auth)
  const [searchTerm, setSearchTerm] = useState('')

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (pagination?.totalPages || 1)) {
      dispatch(fetchWarehouses(page, searchTerm))
    }
  }

  useEffect(() => {
    dispatch(fetchWarehouses(1, searchTerm))
  }, [dispatch, searchTerm])

  const createPageLinks = () => {
    const pages = []
    const totalPages = pagination?.totalPages || 1

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            className={
              pagination?.currentPage === i
                ? 'font-bold cursor-pointer'
                : 'cursor-pointer'
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }
    return pages
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSettings = (id: string) => {
    navigate(`/campus/${id}`)
  }

  if (error) {
    if (status === 401) return <Unauthorized />
    if (status === 403) return <Forbidden />
    if (status === 404) return <NotFound />
    if (status === 500) return <ServerError />
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="p-6 bg-gray-100">
        <div className="mb-4 flex justify-between">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Campus</h2>
          {hasPermission(user?.role, ['ADMIN', 'EMPLOYEE']) && (
            <CreateWarehouseModal />
          )}
        </div>
        <Input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-4"
        />
        {loading ? (
          <Spinner />
        ) : warehouses.length === 0 ? (
          <div className="text-gray-500">No hay campus.</div>
        ) : (
          <>
            <Table className="min-w-full bg-white rounded-lg shadow-md">
              <TableCaption className="text-gray-500">
                {pagination?.totalItems} campu(s) encontrado(s).
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead className="px-4 py-2 text-left text-gray-600">
                    Nombre
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-gray-600">
                    Descripción
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {warehouses.map((warehouse: Warehouse) => (
                  <TableRow key={warehouse.id} className="hover:bg-gray-100">
                    <TableCell className="px-4 py-2 border-b border-gray-200">
                      {warehouse.name}
                    </TableCell>
                    <TableCell className="px-4 py-2 border-b border-gray-200">
                      {warehouse.description}
                    </TableCell>
                    {hasPermission(user?.role, ['ADMIN', 'EMPLOYEE']) && (
                      <TableCell className="px-4 py-2 border-b border-gray-200 text-right">
                        <Edit
                          size={20}
                          className="text-impactBlue cursor-pointer"
                          onClick={() => handleSettings(warehouse.id)}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className="cursor-pointer"
                      onClick={() =>
                        handlePageChange(pagination!.currentPage - 1)
                      }
                    />
                  </PaginationItem>
                  {createPageLinks()}
                  <PaginationItem>
                    <PaginationNext
                      className="cursor-pointer"
                      onClick={() =>
                        handlePageChange(pagination!.currentPage + 1)
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

export default WarehouseList
