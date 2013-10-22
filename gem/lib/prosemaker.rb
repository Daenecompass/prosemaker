
require 'prosemaker/docpart'
require 'pp'

class ProseMaker
  # --------------------------------------------------
  # --------------------------------------------------
  attr_reader :data
  attr_reader :source
  # --------------------------------------------------
  def initialize
    @data = {}
    @source = ''
  end
  # --------------------------------------------------
  def doc
    @parts.map do |part|
      resolve_part part
    end.join
  end
  # --------------------------------------------------
  def data= new_data
    if new_data.respond_to? :[]
      @data = new_data
    else
      raise ArgumentError, 'new data value must be hash-like'
    end
  end
  # --------------------------------------------------
  def source= new_source
    if new_source.respond_to? :to_str
      @source = new_source.to_str
      @parts = []

      raw_parts = @source.split(/\[\[/)
      @parts = raw_parts.map do |raw_part|
        DocPart.new raw_part
      end
    else
      raise ArgumentError, 'new data value must be string-like'
    end
  end
  # --------------------------------------------------
  def resolve_content content
    content = content.to_s
    content = content + ' ' # add a trailing space so the split doesn't fail if the last thing is a var.

    len_sorted_varnames = data.keys.sort { |a, b| b.length <=> a.length }
    replacements = 1

    while replacements > 0 do
      replacements = 0
      len_sorted_varnames.each do |varname|
        bits = content.split('$$' + varname.to_s)
        replacements += bits.length - 1
        content = bits.join(data[varname].to_s)
      end
    end

    content.chop # remove the space we added at the start of this method
  end
  # --------------------------------------------------
  def resolve_condition condition
    condition != 'never'
  end
  # --------------------------------------------------
  def resolve_part part
    if resolve_condition part.condition
      resolve_content part.content
    else
      ''
    end
  end
  # --------------------------------------------------
  # --------------------------------------------------
end
