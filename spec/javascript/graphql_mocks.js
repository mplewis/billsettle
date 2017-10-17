import f from 'faker'

const sample = (...args) => f.random.arrayElement(args)
const randInt = (min, max) => f.random.number({ min, max })

function randomCompanyName () {
  return sample(
    `${f.commerce.productName()} ${f.company.companySuffix()}`,
    `${f.commerce.product()} ${f.company.companySuffix()}`,
    `${f.company.companyName()} ${f.company.companySuffix()}`
  )
}

function sortedDates (count) {
  return Array.from(Array(count)).map(f.date.recent).sort()
}

export default {
  LineItem: () => {
    const desc = randomCompanyName()
    const [date, created] = sortedDates(2).map(d => d.toISOString())
    return {
      created_at: created,
      updated_at: created,
      account: sample('Chase', 'Amex', 'Discover', 'Simple'),
      category: f.commerce.department(),
      cents: randInt(100, 10000),
      date,
      debt_owner: null,
      desc,
      desc_orig: `${desc.toUpperCase()}**`.slice(0, 20),
      note: null,
      status: 'pending',
      txn_type: sample('credit', 'debit')
    }
  },

  User: () => ({
    email: f.internet.email()
  })
}
