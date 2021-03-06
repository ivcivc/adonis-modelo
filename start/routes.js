'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('validateToken', 'SessionController.validateToken')

// Route.get('users', 'UserController.index').middleware(['auth'])

Route.resource('/users', 'UserController')
  .apiOnly() // .except(['index']) nao incluir esta rota
  .middleware('auth')

// Route.get('roles', 'RoleController.index').middleware(['auth:jwt'])
// Route.put('roles/:id', 'RoleController.update')

Route.resource('/roles', 'RoleController')
  .apiOnly()
  .middleware('auth')

Route.get('permissions', 'PermissionController.index')
Route.get('permissions/tree', 'PermissionController.tree')

// Route.get('permissions/index2', 'PermissionController.index')
Route.get('permissions/show', 'PermissionController.show')
Route.put('permissions/user', 'PermissionController.user')
Route.post('permissions', 'PermissionController.store')
Route.put('permissions/:id', 'PermissionController.update')
Route.delete('permissions/:id', 'PermissionController.destroy')

Route.post('passwords', 'ForgotPasswordController.store')

Route.put('passwords', 'ForgotPasswordController.update')

Route.get('oi', () => {
  return {
    message: 'oi'
  }
}).middleware(['auth:jwt', 'can:delete_users'])

Route.get('stats', () => {
  return {
    users: 123,
    categories: 23,
    articles: 30
  }
}).middleware('auth')

Route.get('listTokens', async ({ auth, response }) => {
  try {
    return await auth.check()
  } catch (error) {
    response.send('Missing or invalid api token')
  }
})

Route.get('check', async ({ auth, response }) => {
  try {
    return await auth.check()
  } catch (error) {
    response.send('You are not logged in')
  }
})

Route.get('getUser', async ({ auth, response }) => {
  try {
    return await auth.getUser()
  } catch (error) {
    response.send('You are not logged in')
  }
})

Route.get('logout', async ({ auth, response }) => {
  try {
    return await auth.logout()
  } catch (error) {
    response.send('falha no logout')
  }
})
