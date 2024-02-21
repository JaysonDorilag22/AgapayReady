import React from 'react'
import Sidemenu from '../../components/Sidemenu'
export default function AdminDashboard() {
  return (
    <div className="flex">
    <section>
      <Sidemenu />
    </section>
    <div className="ml-4">Content</div> {/* You can adjust ml (margin-left) according to your preference */}
  </div>
  )
}
