
require 'parslet'

# --------------------------------------------------------------
# this is the class the turns the conditon string into a tree.
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
# This is the class the takes the syntax tree and transforms bits
# of it.  In theory the transforms continue, making the tree
# smaller each time, until there is just a single boolean left,
# which is the 'answer' of the condition.
class ProseConditionResolver < Parslet::Transform

  def initialize(data=nil)
    super()
    @@data = data
  end

  rule(:number => simple(:numstr))  { Float(numstr) }

  # alternate block construction with a passed-in hash " |d| ".  This
  # trick is required for this rule because the replacement block needs
  # to get access to the @@data variable, and if we used the normal
  # block construction, where the 'matched' nodes are available
  # as vars directly, local vars like @@data are hidden.
  rule(:name => simple(:varname))   { |d|
    @@data[d[:varname].to_s]
  }
  rule(:left => simple(:l), :cmp => '<', :right => simple(:r)) { l < r }
  rule(:left => simple(:l), :cmp => '>', :right => simple(:r)) { l > r }
#  rule(:left => simple(:l), :cmp => '=', :right => simple(:r)) { l == r }
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

  pl = ProseConditionParser.new
  pp = ProseConditionResolver.new data

  pp.apply( pl.parse(str) )
rescue Parslet::ParseFailed => failure
  puts failure.cause.ascii_tree
end
# --------------------------------------------------------------
puts resolve('a < 10', { 'a' => 8 })
puts resolve('a < 10', { 'a' => 12 })

