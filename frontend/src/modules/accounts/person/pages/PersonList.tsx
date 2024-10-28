import React, { useState } from 'react'
import StudentList from '../../student/pages/StudentList'
import ProviderList from '../../provider/pages/ProviderList'
import { Separator } from '@/components/index'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const PersonList: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('both')

  const renderContent = () => {
    switch (selectedTab) {
      case 'students':
        return <StudentList />
      case 'providers':
        return <ProviderList />
      case 'both':
      default:
        return (
          <div>
            <StudentList />
            <Separator className="my-6" />
            <ProviderList />
          </div>
        )
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Personas</h2>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="both" className="px-4 py-2">
              Todos
            </TabsTrigger>
            <TabsTrigger value="students" className="px-4 py-2">
              Estudiantes
            </TabsTrigger>
            <TabsTrigger value="providers" className="px-4 py-2">
              Proveedores
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {renderContent()}
    </div>
  )
}

export default PersonList
