import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store'
import { fetchStudent } from '@/redux/actions/accounts/studentActions'
import { SkeletonCard } from '@/components'
import {
  Unauthorized,
  Forbidden,
  NotFound,
  ServerError,
} from '@/modules/base/index'
import UpdateDeleteStudentForm from '../components/UpdateDeleteStudentForm'

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { student, loading, error, status } = useSelector(
    (state: RootState) => state.student,
  )

  useEffect(() => {
    dispatch(fetchStudent(id as string))
  }, [dispatch, id])

  if (loading)
    return <SkeletonCard headerRows={1} detailRows={2} actionRows={2} />

  if (error) {
    if (status === 401) return <Unauthorized />
    if (status === 403) return <Forbidden />
    if (status === 404) return <NotFound />
    if (status === 500) return <ServerError />
  }

  if (!student) return null

  return (
    <div className="p-8">
      <UpdateDeleteStudentForm student={student} />
    </div>
  )
}

export default StudentDetail
