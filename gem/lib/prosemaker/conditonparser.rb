
require 'parslet'

class ProseCondition < Parslet::Parser

  # first define whitespace and other bits
  rule(:space)     { match('\s').repeat(1) }
  rule(:space?)    { space.maybe }
  rule(:digits)    { match('[0-9]').repeat(1) }

  # atoms (including trailing spaces)
  rule(:number)    { ( digits >> (str('.') >> digits).maybe ).as(:number) >> space? }
  rule(:name)      { match('[_a-zA-Z]').repeat(1).as(:name) >> space? }
  rule(:qstring)   { (str('"') >> match('[^"]').repeat(1).as('string') >> str('"')) >> space? }
  rule(:dqstring)  { (str("'") >> match("[^']").repeat(1).as('string') >> str("'")) >> space? }

  # integer or string
  rule(:something) { number | name | qstring | dqstring }

  # root of a condition
  root(:something)
end


def parse(str)
  pc = ProseCondition.new
  pc.parse(str)

rescue Parslet::ParseFailed => failure
  puts failure.cause.ascii_tree
end

puts parse('asdf')
puts parse('234')
puts parse('2.34')
puts parse('"as\'df"')
puts parse("'a\"df'")
