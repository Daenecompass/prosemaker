
require 'parslet'

# --------------------------------------------------------------
class ProseConditionParser < Parslet::Parser

  # first define whitespace and other bits
  rule(:space)      { match('\s').repeat(1) }
  rule(:space?)     { space.maybe }
  rule(:digits)     { match('[0-9]').repeat(1) }

  # atoms (including trailing spaces)
  rule(:number)     { ( digits >> (str('.') >> digits).maybe ).as(:number) >> space? }
  rule(:name)       { match('[_a-zA-Z]').repeat(1).as(:name) >> space? }
  rule(:qstring)    { (str('"') >> match('[^"]').repeat(1).as('string') >> str('"')) >> space? }
  rule(:dqstring)   { (str("'") >> match("[^']").repeat(1).as('string') >> str("'")) >> space? }

  rule(:cmp)        { ( match('[<>]') | str('==') ).as(:cmp) >> space? }

  # integer or varname or string
  rule(:something)  { number | name | qstring | dqstring }

  # comparisons
  rule(:comparison) { something.as(:left) >> cmp >> something.as(:right) }
  rule(:condition)  { comparison }

  # root of a condition
  root(:condition)
end
# --------------------------------------------------------------
class ProseConditionResolver < Parslet::Transform

  def initialize(data=nil)
    super()
    @data = data
    puts @data
  end

#  rule(:name   => simple(:varname)) { varname }
end
# --------------------------------------------------------------
def parse(str)
  pl = ProseConditionParser.new
  pl.parse(str)
rescue Parslet::ParseFailed => failure
  puts failure.cause.ascii_tree
end
# --------------------------------------------------------------
def resolve(str, data)

  puts 'resolving conditon: ' + str
  puts 'using data: ' + data.to_s

  pl = ProseConditionParser.new
  pp = Parslet::Transform.new do

    # replace
    rule(:number => simple(:numstr))  { Float(numstr) }
    rule(:name => simple(:varname))   { |d| data[d[:varname].to_s] }

    rule(:left => simple(:l), :cmp => '<', :right => simple(:r)) { l < r }
  end
  pp.apply(pl.parse(str))
rescue Parslet::ParseFailed => failure
  puts failure.cause.ascii_tree
end
# --------------------------------------------------------------
puts resolve('a < 10', { 'a' => 8 })
puts
puts resolve('a < 10', { 'a' => 12 })

